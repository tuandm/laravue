<template>
  <div class="app-container">

    <el-tag style="margin-bottom:20px;">
      <a href="https://github.com/tuandm/laravue/tree/master/resources/js/components/TreeTable" target="_blank">Documentation</a>
    </el-tag>

    <tree-table :data="data" :eval-func="func" :eval-args="args" :expand-all="expandAll" border>
      <el-table-column label="Event ">
        <template slot-scope="scope">
          <span style="color:sandybrown">{{ scope.row.event }}</span>
          <el-tag>{{ scope.row.timeLine+'ms' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Timeline">
        <template slot-scope="scope">
          <el-tooltip :content="scope.row.timeLine+'ms'" effect="dark" placement="left">
            <div class="processContainer">
              <div
                :style="{ width:scope.row._width * 500+'px',
                          background:scope.row._width>0.5?'rgba(233,0,0,.5)':'rgba(0,0,233,0.5)',
                          marginLeft:scope.row._marginLeft * 500+'px' }"
                class="process">
                <span style="display:inline-block"/>
              </div>
            </div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="Operating" width="200">
        <template slot-scope="scope">
          <el-button type="text" @click="message(scope.row)">Click</el-button>
        </template>
      </el-table-column>
    </tree-table>
  </div>
</template>

<script>
/**
  Auth: Lei.j1ang
  Created: 2018/1/19-14:54
*/
import TreeTable from '@/components/TreeTable';
import treeToArray from './custom-eval';

export default {
  name: 'CustomTreeTableDemo',
  components: { TreeTable },
  data() {
    return {
      func: treeToArray,
      expandAll: false,
      data: {
        id: 1,
        event: 'Event 1',
        timeLine: 100,
        comment: 'No',
        children: [
          {
            id: 2,
            event: 'Event 2',
            timeLine: 10,
            comment: 'No',
          },
          {
            id: 3,
            event: 'Event 3',
            timeLine: 90,
            comment: 'No',
            children: [
              {
                id: 4,
                event: 'Event 4',
                timeLine: 5,
                comment: 'No',
              },
              {
                id: 5,
                event: 'Event 5',
                timeLine: 10,
                comment: 'No',
              },
              {
                id: 6,
                event: 'Event 6',
                timeLine: 75,
                comment: 'No',
                children: [
                  {
                    id: 7,
                    event: 'Event 7',
                    timeLine: 50,
                    comment: 'No',
                    children: [
                      {
                        id: 71,
                        event: 'Event 71',
                        timeLine: 25,
                        comment: '10',
                      },
                      {
                        id: 72,
                        event: 'Event 72',
                        timeLine: 5,
                        comment: '13',
                      },
                      {
                        id: 73,
                        event: 'Event 73',
                        timeLine: 20,
                        comment: '22',
                      },
                    ],
                  },
                  {
                    id: 8,
                    event: 'Event 8',
                    timeLine: 25,
                    comment: 'No',
                  },
                ],
              },
            ],
          },
        ],
      },
      args: [null, null, 'timeLine'],
    };
  },
  methods: {
    message(row) {
      this.$message.info(row.event);
    },
  },
};
</script>
