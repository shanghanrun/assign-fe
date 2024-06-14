import {create} from 'zustand'
import api from '../utils/api';

const reportStore = create((set, get)=>({
	reportList:[],
	createReport:async(userId, assignId, domain, frontEnd, backEnd, comment)=>{
		try{
			const resp = await api.post('/report', {userId, assignId, domain, frontEnd, backEnd, comment})
		}catch(e){

		}
	}
}))

export default reportStore;