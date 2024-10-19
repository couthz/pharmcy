<template>
<div>
  <div class="card">
    <p>NO.{{cardNo}}</p>
  </div>
  <!-- <div class="addbutton">添加到卡包</div> -->
</div>
</template>

<script>
import { getUserInfo } from '@/api/user'
import loading from '@/utils/loading'

export default {
  name: 'mine_membercard',
  data () {
    return {
      cardNo: ''
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      loading.show()
      getUserInfo().then(res => {
        this.cardNo = res.info.cardnumber
        loading.hide()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.rem(@name,@px) {
    @{name}: unit(@px / 75, rem);
 }
.card{
  .rem(width,672);
  .rem(height,404);
  .rem(margin-top,60);
  .rem(margin-bottom,80);
  background-image: url('../../assets/images/cardbg.png');
  background-size: cover;
  margin-left:auto;
  margin-right:auto;
  text-align: center;

  p {
    .rem(font-size,26);
    .rem(padding-top,320);
    .rem(padding-left,200);
    color: #ffffff;
  }

}

.addbutton{
  .rem(width,605);
  .rem(height,98);
  .rem(line-height,98);
  .rem(border-radius,39);
  background-image: url('../../assets/images/addbutton.png');
  background-size: cover;
  margin-left:auto;
  margin-right:auto;
  text-align: center;
  vertical-align: middle;
  .rem(font-size,36);
  font-family:MicrosoftYaHeiLight;
  font-weight:300;
  color:rgba(255,255,255,1);

}
</style>
