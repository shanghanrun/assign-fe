import {useNavigate} from 'react-router-dom'
const CourseCard =()=>{
	
	const navigate= useNavigate()
	return(
		<div onClick={()=>navigate('/Assign')}>

			<div>CourseCard</div>
		</div>
	)
}

export default CourseCard;