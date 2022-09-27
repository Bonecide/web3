import { Link, useNavigate } from 'react-router-dom';
export default function Side() {

    return(
        <div style={{'display' : 'flex','gap' : '20px'}}>
            <Link to={'/'}>ETH</Link>
            <Link to={'/ton'}>TON</Link>
            <Link to={'/sol'}>SOL</Link>
            <Link to={'/switch'}>Switch</Link>
            <Link to={'/usdt'}>Usdt</Link>
        </div>
    )
}