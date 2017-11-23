<template>
	<div class="messTextItem">
		<div class="left-content">{{ leftContent }}<span>{{ asterisk }}</span></div>
			<div class="right-content">
				<input v-if='type' type="number" :name="textName" :placeholder="placeholder" v-model="text" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/" v-bind:readonly="isReadOnly">
				<input v-else type="text" :name="textName" :placeholder="placeholder" v-model="text" :class="color" v-bind:readonly="isReadOnly">
			</div>
			<clear></clear>
	</div>
</template>

<script>
	import clear from '@/components/clear'

	export default {
    name: 'messTextItem',
    data () {
       return {
         isReadOnly: true,
         status: this.$store.state.personalInfo.status,
         text: this.initialPick,
         color: ''
       }
    },
    components: {
      clear
    },
    props: ['leftContent', 'textName', 'placeholder', 'asterisk', 'content', 'initialPick', 'type'],
    methods: {
      readonly() {
        if (this.status === 'alter' && ((this.textName === 'phone') || (this.textName === 'time'))) {
         this.isReadOnly = true
        } else {
         this.isReadOnly = false
        }
        if (this.textName === 'customerName') {
           this.color = 'black'
        }
      }
    },
    watch: {
      text: function() {
       let personalInfo = this.$store.state.personalInfo
       if (this.textName === 'customerName') {
          personalInfo.customerName = this.text
        } else if (this.textName === 'phone') {
          personalInfo.telephone = this.text
        } else if (this.textName === 'id') {
          personalInfo.id = this.text
        } else if (this.textName === 'place') {
          personalInfo.address = this.text
        } else if (this.textName === 'budget') {
          personalInfo.totalPrice = this.text
        } else if (this.textName === 'home') {
          personalInfo.family = this.text
        } else if (this.textName === 'industry') {
          personalInfo.industry = this.text
        } else if (this.textName === 'occupation') {
          personalInfo.occupation = this.text
        } else if (this.textName === 'duty') {
          personalInfo.duty = this.text
        } else if (this.textName === 'workArea') {
          personalInfo.workArea = this.text
        }
        this.$store.commit('addPersonal', personalInfo)
      }
    },
    created: function() {
      this.readonly()
    }
  }
</script>

<style scoped="">
	.messTextItem {
		height: 44px;
		border-bottom: 1px solid #DCE1E8;
		line-height: 44px;
		font-size: 14px;
		background: #ffffff;
		position: relative;
	}
	.left-content {
		float: left;
		color: #7A797B;
		padding-left: 12px;
	}
	.left-content span {
		color: #F35959;
	}
	.right-content {
		float: right;
		padding-right: 12px;
	}
	input {
		text-align: right;
		color: #98A1A8;
	}
	::-webkit-input-placeholder { /* WebKit browsers */  
		font-family: 'PingFangSC-Regular';
    color: #98A1A8;  
	}
  .black {
    color: #030303;
  }
</style>