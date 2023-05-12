<template>
  <el-card>
    <SearchForm
      v-show="true"
      :columns="searchColumns"
      :searchParam="searchParam"
      :search="handleSearch"
      :reset="handleReset"
    />
    <v-chart class="chart" :option="option" autoresize />
  </el-card>
</template>
<script setup lang="tsx">
import { computed, reactive, ref, watch } from 'vue'
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core'
import VChart from 'vue-echarts'
/** 引入柱状图and折线图图表，图表后缀都为 Chart  */
import { BarChart, LineChart } from 'echarts/charts'
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
} from 'echarts/components'
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'
import SearchForm from '@/components/SearchForm'
import { StatisticsInterfaceRes } from '@/api/statistics/types'
import { ColumnProps } from '@/components/ProTable/src/types'
import {
  getAppointmentStatistics,
  getHospitalListByHosname,
} from '@/api/statistics'
import { HospitalListInterfaceRes } from '@/api/hospital/types'
// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  LineChart,
])
// 搜索参数：
const searchParam = reactive({
  hosname: '',
  hoscode: '',
  reserveDateBegin: '',
  reserveDateEnd: '',
})
// 意见单项保存
const suggestItem = ref({} as HospitalListInterfaceRes)
// 监视搜索参数中hosname的变化
watch(
  () => searchParam.hosname,
  (val) => {
    if (val !== '') {
      searchParam.hoscode =
        suggestItem.value.hosname &&
        suggestItem.value.hosname === searchParam.hosname
          ? suggestItem.value.hoscode
          : ''
    }
  },
)
// *搜索配置项
const searchColumns: ColumnProps[] = [
  {
    prop: 'hosname',
    label: '医院名称',
    width: 150,
    search: {
      el: 'autocomplete',
      props: {
        placeholder: '输入医院名称',
        clearable: true,
        'trigger-on-focus': false,
        'value-key': 'hosname',
        'fetch-suggestions': getHospitalListByHosnameHandle,
        onSelect: handleOnSelectedItem,
      },
    },
  },
  {
    prop: 'reserveDateBegin',
    label: '开始时间',
    isShow: false,
    search: {
      el: 'date-picker',
      props: {
        placeholder: '开始时间',
        format: 'YYYY-MM-DD',
        'value-format': 'YYYY-MM-DD',
      },
    },
  },
  {
    prop: 'reserveDateEnd',
    label: '结束日期',
    isShow: false,
    search: {
      el: 'date-picker',
      props: {
        placeholder: '结束日期',
        format: 'YYYY-MM-DD',
        'value-format': 'YYYY-MM-DD',
      },
    },
  },
]

// 预约统计数据
const countMapInfo = ref({} as StatisticsInterfaceRes)
// 根据输入的医院名称动态请求搜索医院列表
async function getHospitalListByHosnameHandle(
  queryString: string,
  cb: (arg: any) => void,
) {
  if (!queryString.trim()) return
  try {
    const res = await getHospitalListByHosname(queryString)
    cb(res.data)
  } catch (error) {
    console.log(error)
  }
}
// 搜索方法
const handleSearch = async () => {
  console.log('search')
  try {
    let params = {
      hoscode: searchParam.hoscode,
      reserveDateBegin: searchParam.reserveDateBegin,
      reserveDateEnd: searchParam.reserveDateEnd,
    }
    const res = await getAppointmentStatistics(params)
    countMapInfo.value = res.data
  } catch (error) {
    console.log(error)
  }
}
// 点击选中单项意见
function handleOnSelectedItem(item: HospitalListInterfaceRes) {
  suggestItem.value = item
}
// 重置
const handleReset = () => {
  console.log('reset')
}
const option = ref({
  title: {
    text: '挂号量统计',
    left: 'left', // 标题位置
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
    },
  },
  xAxis: {
    type: 'category',
    data: computed(() => {
      return countMapInfo.value.dateList || []
    }),
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: computed(() => {
        return countMapInfo.value.countList || []
      }),
      type: 'line',
      smooth: true,
    },
  ],
})
</script>

<style lang="scss" scoped>
.chart {
  height: 600px;
}
</style>
