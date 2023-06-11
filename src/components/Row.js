import { observer } from 'mobx-react';

export const Row = observer((props) => {
    const {symbol} = props;
    console.log(props.symbolName)

    return <div>
        {JSON.stringify(symbol)}
    </div>
})
