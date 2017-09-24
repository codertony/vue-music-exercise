<template>
  <div class="singer">
    <listview :data="singers"></listview>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getSingerList} from 'api/singer'
  import {ERR_OK} from 'api/config'
  import Singer from 'common/js/singer'
  import Listview from '@/base/listview/listview'
  
  const Hot_NAME = '热门',
    HOT_SINGER_LEN = 10
  
  export default {
    data(){
      return{
        singers:[]
      }
    },
    methods:{
      _getSingerList(){
        getSingerList().then((res) => {
          if (res.code === ERR_OK) {
            this.singers = this._normalizeSinger(res.data.list)
            console.log(this.singers)
          }
        })
      },
      _normalizeSinger(list){
        let map ={
          hot: {
            title: Hot_NAME,
            items:[]
          }
        }
        let pushSinger = (i,items) => {
          items.push(new Singer({
            id: i.Fsinger_mid,
            name: i.Fsinger_name
          }))
        }
        list.forEach((i,x) => {
          if (x < HOT_SINGER_LEN) {
            pushSinger(i,map.hot.items)
          }
          const  key = i.Findex
          if(!map[key]){
            map[key] = {
              title: key,
              items: []
            }
          }
          pushSinger(i,map[key].items)
        })
        
        let hot = []
        let ret = []
        for(let key in map){
          let val = map[key]
          if(val.title.match(/[a-zA-Z]/)){
            ret.push(val)
          }else if(val.title === Hot_NAME) {
            hot.push(val)
          }
        }
        ret.sort((a,b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(ret)
      }
    },
    created(){
      this._getSingerList()
    },
    components:{
      Listview,
    }
    
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  .singer
    position absolute
    top 88px
    bottom 0
    width: 100%

</style>
