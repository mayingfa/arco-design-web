<template>
  <div class="container">
    <Breadcrumb :items="['列表页', '查询表格']" />
    <a-card class="general-card" title="查询表格">
      <a-row>
        <a-col :flex="1">
          <a-form
            :model="formModel"
            :label-col-props="{ span: 6 }"
            :wrapper-col-props="{ span: 18 }"
            label-align="left"
          >
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item field="number" label="集合编号">
                  <a-input
                    v-model="formModel.number"
                    placeholder="请输入集合编号"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="name" label="集合名称">
                  <a-input
                    v-model="formModel.name"
                    placeholder="请输入集合名称"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="contentType" label="内容体裁">
                  <a-select
                    v-model="formModel.contentType"
                    :options="contentTypeOptions"
                    placeholder="全部"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="filterType" label="筛选方式">
                  <a-select
                    v-model="formModel.filterType"
                    :options="filterTypeOptions"
                    placeholder="全部"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="createdTime" label="创建时间">
                  <a-range-picker
                    v-model="formModel.createdTime"
                    style="width: 100%"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="status" label="状态">
                  <a-select
                    v-model="formModel.status"
                    :options="statusOptions"
                    placeholder="全部"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-divider style="height: 84px" direction="vertical" />
        <a-col :flex="'86px'" style="text-align: right">
          <a-space direction="vertical" :size="18">
            <a-button type="primary" @click="search">
              <template #icon>
                <icon-search />
              </template>
              查询
            </a-button>
            <a-button @click="reset">
              <template #icon>
                <icon-refresh />
              </template>
              重置
            </a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-divider style="margin-top: 0" />
      <a-row style="margin-bottom: 16px">
        <a-col :span="16">
          <a-space>
            <a-button type="primary">
              <template #icon>
                <icon-plus />
              </template>
              新建
            </a-button>
            <a-upload action="/">
              <template #upload-button>
                <a-button> 批量导入 </a-button>
              </template>
            </a-upload>
          </a-space>
        </a-col>
        <a-col :span="8" style="text-align: right">
          <a-button>
            <template #icon>
              <icon-download />
            </template>
            下载
          </a-button>
        </a-col>
      </a-row>
      <a-table
        row-key="id"
        :loading="loading"
        :pagination="pagination"
        :data="renderData"
        :bordered="false"
        @pageChange="onPageChange"
      >
        <template #columns>
          <a-table-column title="集合编号" data-index="number" />
          <a-table-column title="集合名称" data-index="name" />
          <a-table-column title="内容体裁" data-index="contentType">
            <template #cell="{ record }">
              <a-space>
                <div v-if="record.contentType === 'img'">
                  <a-avatar :size="16" shape="square">
                    <img :src="pictureIcon" alt="icon" />
                  </a-avatar>
                  图文
                </div>
                <div v-else-if="record.contentType === 'horizontalVideo'">
                  <a-avatar :size="16" shape="square">
                    <img :src="horizontalVideoIcon" alt="avatar" />
                  </a-avatar>
                  横板短视频
                </div>
                <div v-else>
                  <a-avatar :size="16" shape="square">
                    <img :src="verticalVideoIcon" alt="avatar" />
                  </a-avatar>
                  竖版小视频
                </div>
              </a-space>
            </template>
          </a-table-column>
          <a-table-column title="筛选方式" data-index="filterType">
            <template #cell> 人工筛选 </template>
          </a-table-column>
          <a-table-column title="内容量" data-index="count" />
          <a-table-column title="创建时间" data-index="createdTime" />
          <a-table-column title="状态" data-index="status">
            <template #cell="{ record }">
              <span v-if="record.status === 'offline'" class="circle"></span>
              <span v-else class="circle pass"></span>
              {{ record.status === 'offline' ? '已下线' : '已上线' }}
            </template>
          </a-table-column>
          <a-table-column title="操作" data-index="operations">
            <template #cell>
              <a-button type="text" size="small"> 查看 </a-button>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, reactive } from 'vue';
import useLoading from '@/hooks/loading';
import { queryPolicyList, PolicyRecord, PolicyParams } from '@/api/list';
import { Pagination, Options } from '@/types/global';
import pictureIcon from '@/assets/icons/picture.svg?url';
import horizontalVideoIcon from '@/assets/icons/video-horizontal.svg?url';
import verticalVideoIcon from '@/assets/icons/video-vertical.svg?url';

const generateFormModel = () => {
  return {
    number: '',
    name: '',
    contentType: '',
    filterType: '',
    createdTime: [],
    status: '',
  };
};
export default defineComponent({
  setup() {
    const { loading, setLoading } = useLoading(true);
    const renderData = ref<PolicyRecord[]>([]);
    const formModel = ref(generateFormModel());
    const basePagination: Pagination = {
      current: 1,
      pageSize: 20,
    };
    const pagination = reactive({
      ...basePagination,
    });
    const contentTypeOptions = computed<Options[]>(() => [
      {
        label: '图文',
        value: 'img',
      },
      {
        label: '横版短视频',
        value: 'horizontalVideo',
      },
      {
        label: '竖版小视频',
        value: 'verticalVideo',
      },
    ]);
    const filterTypeOptions = computed<Options[]>(() => [
      {
        label: '人工筛选',
        value: 'artificial',
      },
      {
        label: '规则筛选',
        value: 'rules',
      },
    ]);
    const statusOptions = computed<Options[]>(() => [
      {
        label: '已上线',
        value: 'online',
      },
      {
        label: '已下线',
        value: 'offline',
      },
    ]);
    const fetchData = async (
      params: PolicyParams = { current: 1, pageSize: 20 }
    ) => {
      setLoading(true);
      try {
        const { data } = await queryPolicyList(params);
        renderData.value = data.list;
        pagination.current = params.current;
        pagination.total = data.total;
      } catch (err) {
        // you can report use errorHandler or other
      } finally {
        setLoading(false);
      }
    };

    const search = () => {
      fetchData({
        ...basePagination,
        ...formModel.value,
      } as unknown as PolicyParams);
    };
    const onPageChange = (current: number) => {
      fetchData({ ...basePagination, current });
    };

    fetchData();
    const reset = () => {
      formModel.value = generateFormModel();
    };
    return {
      loading,
      search,
      onPageChange,
      renderData,
      pagination,
      formModel,
      reset,
      contentTypeOptions,
      filterTypeOptions,
      statusOptions,
      pictureIcon,
      horizontalVideoIcon,
      verticalVideoIcon,
    };
  },
});
</script>

<style scoped lang="less">
:deep(.arco-avatar) {
  vertical-align: text-bottom;
  background-color: unset;
  cursor: default;
  user-select: none;

  .arco-avatar-image {
    overflow: revert;
  }
}

:deep(.arco-table-th) {
  &:last-child {
    .arco-table-th-item-title {
      margin-left: 16px;
    }
  }
}
</style>
