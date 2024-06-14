import {create} from 'zustand'
import api from './../utils/api';

const assignStore = create((set,get)=>({
	updated:false,
	assignList:null,
	weekOne:null,
	weekTwo:null,
	weekThree:null,
	weekFour:null,
	selectedAssign:null,
	createAssign:async(week,dueDate,lecture,assignType,status,submit,feedback)=>{
		try{
			const resp = await api.post('/assign',{week,dueDate,lecture,assignType, status,submit,feedback})
			set({updated: !get().updated})
		}catch(e){
			console.log(e.error)
		}
	},
	getAssignList:async()=>{
		try{
			const resp = await api.get('/assign/list')
			console.log('받은 assignList data:', resp.data.data)
			const list = [...resp.data.data]
			const weekOne=[], weekTwo=[], weekThree=[], weekFour=[]
			
			list.forEach((item)=>{
				if(item.week ===1){
					weekOne.push(item)
				}
				if(item.week ===2){
					weekTwo.push(item)
				}
				if(item.week ===3){
					weekThree.push(item)
				}
				if(item.week ===4){
					weekFour.push(item)
				}
			})
			console.log('weekOne :', weekOne)
			set({
				assignList: resp.data.data,
				weekOne: weekOne,
				weekTwo: weekTwo,
				weekThree: weekThree,
				weekFour: weekFour
			})
		}catch(e){
			console.log(e.error)
		}
	},
	createUserAssignList:async()=>{
	},
	setSelectedAssign:(val)=>set({selectedAssign: val}),
	updateAssign:async(assignId,week,dueDate,lecture,assignType,status, submit, feedback, reportId)=>{
		try{
			const resp = await api.post('/assign/update', {assignId,week,dueDate,lecture,assignType,status, submit, feedback, reportId})
			set({scheduleList: resp.data.data})
		}catch(e){
			console.log(e.error)
		}
	},
	getAssign:async(assignId)=>{
		try{
			const resp = await api.post('/assign/one',{assignId})
			set({selectedAssign: resp.data.data})
		}catch(e){
			console.log(e.error)
		}
	}
}))

export default assignStore;