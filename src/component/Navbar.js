import {Button} from 'react-bootstrap'
import userStore from '../store/userStore'
import {useNavigate} from 'react-router-dom'

const Navbar =()=>{
	const {logout} = userStore()
	const navigate= useNavigate()
	return(
		<div style={{display:'flex', justifyContent:'end',
			marginTop: '20px', marginRight:'50px'
		}}>

			<Button onClick={()=>logout(navigate)}>로그아웃</Button>
		</div>
	)
}

export default Navbar;