import { defineStore } from "pinia";
import { reactive } from "vue";
import { reqCategory1,reqCategory2,reqCategory3 } from '../../api/product/attr';
let useCategoryStore=defineStore('category',()=>{
    const state=reactive({
        getCategoryId1:'',
        getCategoryId2:'',
        getCategoryId3:'',
        getCategory1:'',
        getCategory2:'',
        getCategory3:''
    })
    return{
        state,
        async getC1(){
            let result = await reqCategory1()
            if (result.code==200){
                this.state.getCategory1=result.data
            }
        },
        async getC2(){
            let result = await reqCategory2(this.state.getCategoryId1)
            if (result.code==200){
                this.state.getCategory2=result.data
        }
    },
        async getC3(){
            let result = await reqCategory3(this.state.getCategoryId2)
            if (result.code==200){
                this.state.getCategory3=result.data
        }
    }

}
})
export default useCategoryStore