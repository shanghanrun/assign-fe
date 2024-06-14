import CourseCard from "../component/CourseCard";
import Navbar from "../component/Navbar";
// import assignStore from "../store/assignStore";
// import {useEffect} from 'react'

const HomePage=()=>{
	// const {getAssignList, assignList} = assignStore()
	// console.log('HomePage assignList:', assignList)
	// useEffect(()=>{
	// 	getAssignList()
	// },[])
	return(
		<div>
			<Navbar />
			<div>
				<CourseCard />
			</div>
		</div>
	)
}

export default HomePage;