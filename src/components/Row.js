import { useQuery } from 'react-query';
import { queryClient } from '..';
import { useSymbolStore } from '../App';

export const Row = ((props) => {
    const symboll = useSymbolStore(state => state.symbols[props.symbol]);
    console.log(symboll)
    return <div>
        {JSON.stringify(symboll)}
    </div>
})
