import {create} from 'zustand'
import api from '../utils/api'

const userStore =create((set,get)=>({
	user:null,
	selectedUser:null,
	error:'',
	userList:[],
	totalUserCount:1,
	userUpdated:false,
	
	setError:(val)=>set({error:val}),
	setSelectedUser:(user)=>{
		set({selectedUser: user})},
	
	updateUser:async(userId, level, memo, image,failNo, notSubmitNo)=>{
		try{
			const resp = await api.put('/user/update', {userId,level,failNo, notSubmitNo})
			set({
				selectedUser: resp.data.data,
				userUpdated: !get().userUpdated
			})
		}catch(e){
			console.log(e.error)
		}
	},
	getUserList: async(searchQuery)=>{
		if(searchQuery?.name ===''){
			delete searchQuery.name;
		}
		try{
			const resp = await api.get('/user/list', {params:{...searchQuery}})
			set({
				userList: resp.data.data,
				totalUserCount:resp.data.data?.length
			})
		}catch(e){

		}
	},
	loginWithToken: async ()=> {
		// const token= sessionStorage.getItem('token') 이것 필요없다. api에서 알아서 해더에 넣도록 설정해 두었다.
		//그럼에도 불구하고, token값을 불러와서 token이 없을 경우에는 불필요한 백엔드 요청을 안하도록 하는 것이 좋다.
		const token = sessionStorage.getItem('token')
		if(!token) return;

		try{
			const resp = await api.get('/user/me')
			const u = resp.data.user
			
			set({
				user: u,
			})
		} catch(e){
			console.log('e.error:', e.error)
			// set({error:e.error}) 이걸 안해야 Login페이지에 쓸데없는 에러메시지가 안나온다.
			set({error: ''})
			// this.logout()  zustand this사용 못한다.
			// invalid한 토큰삭제,user null로
			sessionStorage.clear()
			set({user:null})
		}
	},
	loginWithEmail: async ({email,password})=>{
		try{
			const resp = await api.post('/user/login', {email,password})
			console.log('resp', resp)
			const u = resp.data.user
			const t = resp.data.token
			
			set({
				user: u,
			})
			sessionStorage.setItem('token',t)
		} catch(e){
			console.log('e :', e)
			set({error: e.error})
		}
	},
	logout:(navigate)=> {   
		sessionStorage.clear()
		navigate('/') //로그인으로 라우팅
		set({user:null})
	},
	loginWithGoogle: async (token)=>{
		try{
			const resp = await api.post('/user/google', {token})
			const u = resp.data.user
			const t = resp.data.token
			set({
				user: u
			})
			sessionStorage.setItem('token',t)
		}catch(e){
			console.log('e.error:', e.error)
			set({error: e.error})
		}
	},
	registerUser: async({name,email,password}, navigate)=>{
		try{
			const resp = await api.post('/user', {email,password,name})
			console.log('회원등록 성공')
			// set({user: resp.data.data})
		
			set({userUpdated: !get().userUpdated})
			navigate('/') //루트가 로그인이다.

		}catch(e){
			console.log(e.error)
		}
	},


}))

export default userStore;