<template>
  <div class="app-container">
    <el-tag style="margin-bottom:20px;">
      <a
        href="https://github.com/tuandm/laravue/tree/master/resources/js/components/TreeTable"
        target="_blank"
      >Documentation</a>
    </el-tag>

    <tree-table :data="data" :columns="columns" border/>
  </div>
</template>

<script>
/**
  Auth: Lei.j1ang
  Created: 2018/1/19-14:54
*/
import treeTable from '@/components/TreeTable';

export default {
  name: 'TreeTableDemo',
  components: { treeTable },
  data () {
    return {
      columns: [
        {
          text: 'Event',
          value: 'event',
          width: 200,
        },
        {
          text: 'ID',
          value: 'id',
        },
        {
          text: 'Timeline',
          value: 'timeLine',
        },
        {
          text: 'Comment',
          value: 'comment',
        },
      ],
      data: [
        {
          id: 0,
          event: 'Event 1',
          timeLine: 50,
          comment: 'No',
        },
        {
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
                          comment: '12',
                        },
                        {
                          id: 72,
                          event: 'Event 72',
                          timeLine: 5,
                          comment: '44',
                        },
                        {
                          id: 73,
                          event: 'Event 73',
                          timeLine: 20,
                          comment: '56',
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
      ],
    };
  },
};
</script>
