import TestDetailClient from './test-detail-client'

// 定义测评历史详情数据的类型
type MockTestDetails = {
  [key: number]: any;
}

// 模拟测评历史详情数据
const mockTestDetails: MockTestDetails = {
  1: {
    id: 1,
    testId: 1,
    title: "青少年抑郁自评量表",
    // ... 其他数据
  },
  2: {
    id: 2,
    testId: 3,
    title: "学业压力评估量表",
    // ... 其他数据
  },
  3: {
    id: 3,
    testId: 2,
    title: "青少年焦虑自评量表",
    // ... 其他数据
  },
  4: {
    id: 4,
    testId: 4,
    title: "人际关系自评量表",
    // ... 其他数据
  },
  5: {
    id: 5,
    testId: 1,
    title: "青少年抑郁自评量表",
    // ... 其他数据
  },
  6: {
    id: 6,
    testId: 2,
    title: "青少年焦虑自评量表",
    // ... 其他数据
  },
}

// 为静态导出生成所有可能的路径参数
export function generateStaticParams() {
  // 返回所有可能的id参数
  return Object.keys(mockTestDetails).map(id => ({
    id: id.toString()
  }));
}

export default function TestDetail({ params }: { params: { id: string } }) {
  return <TestDetailClient id={params.id} />
}
