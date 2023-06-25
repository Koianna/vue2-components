import Mock from 'mockjs'
import homeApi from './mockServeData/home'
import treeApi from './mockServeData/tree'

// 定义mock请求拦截
Mock.mock('/api/home/getData', homeApi.getStatisticalData)

Mock.mock('/api/tree/getTreeData', treeApi.getStatisticalData)
