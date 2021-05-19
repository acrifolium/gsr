import React, { useState, useEffect, useRef } from 'react';
import useCurrencies from '../../_customHooks/useCurrencies';
import Box from '@material-ui/core/Box/Box';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Container from '@material-ui/core/Container';
import SwitchCurrency from '../../components/switchCurrency/switchCurrency';
import Hotkeys from 'react-hot-keys';
import OrderBook from '../../components/orderBook/orderBook';
import MessageService from '../../components/message/messageService';
import Loading from '../../components/loading/loading';

const useStyles = makeStyles(theme => ({
  home: {
    padding: theme.spacing(8, 2)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

// TODO LIST
// 1 - Display Bids and Asks on 10 levels
// 2 - Manage l2update type (think about memo HOC IMPORTANT)
// 3 - Interrupt the program at CTRL + C (Closed Socket I think - User message to inform that the process has been terminated)
// 4 - Code review (Remove unecessary code - make component if needed)
// 5 - Check UI/UX (green for bids and red for asks - add loader) - Add title Order Book

const type = {
	SUBSCRIBE: 'subscribe',
	UNSUBSCRIBE: 'unsubscribe',
	SNAPSHOT: 'snapshot',
	L2UPDATE: 'l2update'
}

function Home() {
  const classes = useStyles();
  const currencies = useCurrencies();
  const [pair, setpair] = useState("");
  const [data, setdata] = useState();
  const ws = useRef(null);
  const level = 10;

  useEffect(() => {
    ws.current = new WebSocket("wss://ws-feed.pro.coinbase.com");
  }, []);

  useEffect(() => {
    if (!pair) {
      return;
    }

    let msg = {
		type:type.SUBSCRIBE,
		product_ids: [pair],
		channels: ["level2"]
    };
    let jsonMsg = JSON.stringify(msg);
    ws.current.send(jsonMsg);

    ws.current.onmessage = (e) => {
		let coinBaseData = JSON.parse(e.data);
		if (![type.SNAPSHOT, type.L2UPDATE].includes(coinBaseData.type)) {
			return;
		}

		console.log("Type ::", coinBaseData.type);

		if (coinBaseData.type === type.SNAPSHOT) {
			setdata({
				bids: coinBaseData.bids.slice(Math.max(coinBaseData.bids.length - level, 1)),
				asks: coinBaseData.asks.slice(Math.max(coinBaseData.asks.length - level, 1))
			});
		}

		const handleL2Update = (key, price, size) => {
			if (data) {
				const newArray = data[key].slice(0, Math.max(data[key].length) - 1);
				newArray.unshift([price, size]);
				setdata({
					...data,
					[key]: newArray
				});
			}
		};

		if (coinBaseData.type === type.L2UPDATE) {
			handleL2Update(
				coinBaseData.changes[0][0] === 'buy' ? 'bids' : 'asks', 
				coinBaseData.changes[0][1], 
				coinBaseData.changes[0][2]
			);
		}
    };
  }, [pair, data]);

  const handleSelect = (e) => {
	let unsubMsg = {
		type: type.UNSUBSCRIBE,
		product_ids: [pair],
		channels: ["level2"]
	};
	let unsub = JSON.stringify(unsubMsg);

	ws.current.send(unsub);

    setpair(e.target.value);
  };

  const onKeyDown = () => {
    console.log("ShortCut Ctrl + C detected.");
	if (ws.current) {
		ws.current.close();
		console.log("WebSocket has been closed.");
		ws.current = new WebSocket("wss://ws-feed.pro.coinbase.com");
		MessageService.warning("WebSocket has been closed and reinitialized.");
	}
  };

  return (
    <Hotkeys 
        keyName="ctrl+c" 
        onKeyDown={onKeyDown.bind(this)}
    >
		<section>
			<Container>
				<Box display="flex" justifyContent="center" mt={5}>
					<Typography variant="h2" color="primary">
						Order Book
					</Typography>
				</Box>
			</Container>
		</section>
		
		{currencies && currencies.length > 0 ?
			(
			<React.Fragment>
				<section className={classes.home}>
					<Container>
						<Box display="flex" justifyContent="center">
							<SwitchCurrency
								currencies={currencies}
								onSelect={handleSelect}
								pair={pair}
							/>
						</Box>
					</Container>
				</section>
				<section>
					<Container>
						{data ? (<OrderBook bids={data.bids} asks={data.asks}></OrderBook>) 
						: 
						(
							<Box display="flex" justifyContent="center">
								<Typography variant="h4" color="primary">
									Choose a currency to start the process
								</Typography>
							</Box>
						)}
					</Container>
				</section>
			</React.Fragment>
		) : 
		(
			<Box display="flex" justifyContent="center">
				<Loading />
			</Box>
		)
		}
	</Hotkeys>
  );
}

export default Home;
