//小仓库：layout组件相关配置仓库
import { defineStore } from "pinia";
import { reactive } from "vue";
const useLayoutSettingStore=defineStore('settingStore',()=>{
    const state = reactive({
        fold:false,//用于控制菜单是折叠还是展开
        refresh:false,//用于控制是否刷新
        span1:4,
        span2:20
    })
    return{
        state,
        changeSpan(){
            if (state.fold===false){
                state.span1=4,
                state.span2=20
            }else if(state.fold===true){
                state.span1=1,
                state.span2=23
            }
                
            }
    }
})
export default useLayoutSettingStore