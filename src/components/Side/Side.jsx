import { Link, useNavigate } from 'react-router-dom';
export default function Side() {

    return(
        <div style={{'display' : 'flex','gap' : '20px'}}>
            <Link to={'/'}>ETH</Link>
            <Link to={'/ton'}>TON</Link>
        </div>
    )
}