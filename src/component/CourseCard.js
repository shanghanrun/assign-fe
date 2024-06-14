import {useNavigate} from 'react-router-dom'
const CourseCard =()=>{
	
	const navigate= useNavigate()
	return(
		<div onClick={()=>navigate('/assign')}>
			<img src="node_study.png" alt=''/>
		</div>
	)
}

export default CourseCard;