<template>
  <div ref="wrapper">
      <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll'
    export default {
        props:{
            probeType:{
                type:Number,
                default:1
            },
            click:{
                type:Boolean,
                default:true
            },
            data:{
                type:Array,
                default: null
            }
        },
        mounted() {
            setTimeout(() => {
                this._initScroll()
            }, 20)
        },
        methods: {
            _initScroll() {
                if(!this.$refs.wrapper){
                    return
                }
                this.scroll = new BScroll(this.$refs.wrapper, {
                    probeType: this.probeType,
                    click: this.click
                })
            },
            enable(){
                this.scroll && this.scroll.enable()
            },
            disable(){
                this.scroll && this.scroll.disable()
            },
            refresh(){
                if(this.scroll){
                    setTimeout(() => {
                        this.scroll.refresh()
                    },20)
                }
            }
        },
        watch: {
            data() {
                this.refresh()
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>


</style>
