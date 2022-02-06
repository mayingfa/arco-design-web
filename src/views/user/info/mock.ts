import Mock from 'mockjs';
import setupMock, { successResponseWrap } from '@/utils/setup-mock';

setupMock({
  setup() {
    // 最新项目
    Mock.mock(new RegExp('/api/user/my-project/list'), () => {
      const contributors = [
        {
          name: '秦臻宇',
          email: 'qingzhenyu@arco.design',
          avatar:
            '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
        },
        {
          name: '于涛',
          email: 'yuebao@arco.design',
          avatar:
            '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
        },
        {
          name: '宁波',
          email: 'ningbo@arco.design',
          avatar:
            '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp',
        },
        {
          name: '郑曦月',
          email: 'zhengxiyue@arco.design',
          avatar:
            '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/8361eeb82904210b4f55fab888fe8416.png~tplv-uwbnlip3yd-webp.webp',
        },
        {
          name: '宁波',
          email: 'ningbo@arco.design',
          avatar:
            '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp',
        },
      ];
      const units = [
        {
          name: '企业级产品设计系统',
          description: 'Arco Design System',
        },
        {
          name: '火山引擎智能应用',
          description: 'The Volcano Engine',
        },
        {
          name: 'OCR文本识别',
          description: 'OCR text recognition',
        },
        {
          name: '内容资源管理',
          description: 'Content resource management ',
        },
        {
          name: '今日头条内容管理',
          description: 'Toutiao content management',
        },
        {
          name: '智能机器人',
          description: 'Intelligent Robot Project',
        },
      ];
      return successResponseWrap(
        new Array(6).fill(null).map((_item, index) => ({
          id: index,
          name: units[index].name,
          description: units[index].description,
          peopleNumber: Mock.Random.natural(10, 1000),
          contributors,
        }))
      );
    });

    // 最新动态
    Mock.mock(new RegExp('/api/user/latest-activity'), () => {
      return successResponseWrap(
        new Array(7).fill(null).map((_item, index) => ({
          id: index,
          title: '发布了项目 Arco Design System',
          description: '企业级产品设计系统',
          avatar:
            '//lf1-xgcdn-tos.pstatp.com/obj/vcloud/vadmin/start.8e0e4855ee346a46ccff8ff3e24db27b.png',
        }))
      );
    });

    // 访问量
    Mock.mock(new RegExp('/api/user/visits'), () => {
      return successResponseWrap([
        {
          name: '主页访问量',
          visits: 5670,
          growth: 206.32,
        },
        {
          name: '项目访问量',
          visits: 5670,
          growth: 206.32,
        },
      ]);
    });

    // 项目和团队列表
    Mock.mock(new RegExp('/api/user/project-and-team/list'), () => {
      return successResponseWrap([
        {
          id: 1,
          content: '他创建的项目',
        },
        {
          id: 2,
          content: '他参与的项目',
        },
        {
          id: 3,
          content: '他创建的团队',
        },
        {
          id: 4,
          content: '他加入的团队',
        },
      ]);
    });

    const myTeamList = Mock.mock({
      'list|4': [
        {
          'id|1': '@increment()',
          'name|1': [
            '火山引擎智能应用团队',
            '企业级产品设计团队',
            '前端/UE小分队',
            '内容识别插件小分队',
            '敏捷测试团队',
            '火山翻译研发团队',
            '今日头条产品设计团队',
          ],
          'peopleNumber|1-10': 100,
          'avatar': '@dataImage(70x70,团队头像)',
        },
      ],
    });

    // 团队列表
    Mock.mock(new RegExp('/api/user/my-team/list'), () => {
      return successResponseWrap(myTeamList.list);
    });
  },
});
