import CourseCard from "../component/CourseCard";
import Navbar from "../component/Navbar";
import {useEffect} from 'react'
import userStore from '../store/userStore'
import assignStore from '../store/assignStore'
import {Button} from 'react-bootstrap'

const HomePage=()=>{
	const {user} = userStore()
	console.log('user :', user)
	console.log('user id:', user?._id)
	const {createUserAssignList, getUserAssignList} = assignStore()
	
	return(
		<div>
			<Navbar />
			<div style={{display:'flex', justifyContent:'center', gap:'10px'}}>
				<CourseCard />
				
			</div>
		</div>
	)
}

export default HomePage;