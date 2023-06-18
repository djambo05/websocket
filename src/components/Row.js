import { useQuery } from 'react-query';
import { queryClient } from '..';

export const Row = ((props) => {
    const symboll = props?.symbol?.symbol;
    const {data: symbol} = useQuery(['symbols', symboll], () => queryClient.getQueryData(['symbols', symboll]))
    console.log(symbol)
    return <div>
        {JSON.stringify(symbol)}
    </div>
})
