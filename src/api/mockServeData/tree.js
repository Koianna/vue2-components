// mock数据模拟
import Mock from 'mockjs'

// 图表数据
const List = []
export default {
  getStatisticalData: () => {
    // Mock.Random.float 产生随机数100到8000之间 保留小数 最小0位 最大0位
    for (let i = 0; i < 7; i++) {
      List.push(
        Mock.mock({
          /* 苹果: Mock.Random.float(100, 8000, 0, 0),
          vivo: Mock.Random.float(100, 8000, 0, 0),
          oppo: Mock.Random.float(100, 8000, 0, 0),
          魅族: Mock.Random.float(100, 8000, 0, 0),
          三星: Mock.Random.float(100, 8000, 0, 0),
          小米: Mock.Random.float(100, 8000, 0, 0) */
        })
      )
    }
    return {
      code: 20000,
      data: {
        parent: [
          { name: '文件夹1', pid: 0, id: 1 },
          { name: '文件夹2', pid: 0, id: 2 },
          { name: '文件夹3', pid: 0, id: 3 },
          { name: '文件夹1-1', pid: 1, id: 4 },
          { name: '文件夹2-1', pid: 2, id: 5 }
        ],
        child: [
          { name: '文件1', pid: 1, id: 10001 },
          { name: '文件2', pid: 1, id: 10002 },
          { name: '文件2-1', pid: 2, id: 10003 },
          { name: '文件2-2', pid: 2, id: 10004 },
          { name: '文件1-1-1', pid: 4, id: 10005 },
          { name: '文件2-1-1', pid: 5, id: 10006 }
        ]

      }
    }
  }
}
