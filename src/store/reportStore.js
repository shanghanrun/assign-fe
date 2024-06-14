import {create} from 'zustand'
import api from '../utils/api';

const reportStore = create((set, get)=>({
	reportList:[],
	createReport:async(user, assignId, domain, frontEnd, backEnd, comment)=>{
		const userId = user._id
		const userName = user.name
		try{
			const resp = await api.post('/report', {userId, userName, assignId, domain, frontEnd, backEnd, comment})
		}catch(e){

		}
	}
}))

export default reportStore;