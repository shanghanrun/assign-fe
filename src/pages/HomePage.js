import CourseCard from "../component/CourseCard";
import Navbar from "../component/Navbar";
import {useEffect} from 'react'
import userStore from '../store/userStore'
import assignStore from '../store/assignStore'
import {Button} from 'react-bootstrap'

const HomePage=()=>{
	const {user} = userStore
	console.log('user :', user)
	console.log('user id:', user?._id)
	const {createUserAssignList, getUserAssignList} = assignStore()
	// console.log('HomePage assignList:', assignList)
	// useEffect(()=>{
	// 	getAssignList()
	// },[])
	// useEffect(()=>{ // user의 assignList를 생성한다.
	// 	createUserAssignList(user?._id)
	// },[user])
	// useEffect(()=>{
	// 	getUserAssignList(user?._id)
	// },[user]) 이것도 안된다.
	return(
		<div>
			<Navbar />
			<div style={{display:'flex', justifyContent:'center', gap:'10px'}}>
				<CourseCard />
				
				 <Button variant="success" 
					onClick={()=>createUserAssignList(user?._id)}>유저 Assign 생성하기 </Button>
				{/* {(user?._level ==='admin')? <Button variant="success" 
					onClick={()=>createUserAssignList(user?._id)}>유저 Assign 생성하기 </Button>: <div></div>} */}
			</div>
		</div>
	)
}

export default HomePage;