## Prerequisite
This component only provides a solution to create a TreeTable

## prop
#### *data*
  **Required**

  Raw data, is an array or object
  ```javascript
    [{
      key1: value1,
      key2: value2,
      children: [{
        key1: value1
      },
      {
        key1: value1
      }]
    },
    {
      key1: value1
    }]
  ```
  Or
 ```javascript
    {
      key1: value1,
      key2: value2,
      children: [{
        key1: value1
      },
      {
        key1: value1
      }]
    }
  ```

#### columns
  Column attribute, the requirement is an array

  1. text: Dislayed text on the header
  2. value: Corresponding displayed value on the column
  3. width: Width of each column (number - optional)

  If you want to custom style on each field or to have nest other components, columns can be provided, just like writing in el-table. If there is no custom content, providing columns this way will be more convenient.

  If you have several fields that need to be customized, and a few do not, then you can put the fields that do not need to be customized into the columns, and put the customized content into the `slot`. See section below for more details.
  
  ```javascript
  [{
    value:string,
    text:string,
    width:number
  },{
    value:string,
    text:string,
    width:number
  }]
  ```

#### expandAll
  Set expanded by default (boolean, default is false)

#### evalFunc
  Analytic function (function - optional)

   If not provided, the default [evalFunc](./eval.js) will be used.

   If evalFunc is provided, the provided evalFunc will be used to parse the data and return the value required for the treeTable rendering. How to write an evalFunc, please refer to [*eval.js*] (https://github.com/tuandm/laravue/tree/master/resources/js/components/TreeTable/eval.js) or [*custom-eval.js*](https://github.com/tuandm/laravue/tree/master/resources/js/views/table/TreeTable/custom-eval.js)

#### evalArgs
  The argument to the parsing function is an array

  **Please note that the first parameter of the custom analytic function is this.data, the second parameter is this.expandAll, you don't need to fill it in evalArgs. Please noted that these two parameters are mandatory and the position cannot be reversed** *this.data is the data that needs to be parsed, and this.expandAll is the default expansion*

  If your parsing function requires `(this.data, this.expandAll,1,2,3,4)`, then you only need to assign `[1,2,3,4]` to `evalArgs`. It’s ok

  If your analytic function parameter has only `(this.data, this.expandAll)`, then you don't have to fill in evalArgs.

  For details, please refer to [*custom-eval.js*] (https://github.com/tuandm/laravue/tree/master/resources/js/views/table/TreeTable/custom-eval.js) function parameters and [customTreeTable] `evalArgs` attribute value (https://github.com/tuandm/laravue/tree/master/resources/js/views/table/TreeTable/CustomTreeTable.vue)

 ## slot
 This is a slot for a custom column.

 By default, the TreeTable only has the ability to display data in a row. But in general, we will need to add an action button to the row or display different styles based on the data in the row, then we need to customize the column. Please refer to [CustomTreeTable](https://github.com/tuandm/laravue/tree/master/resources/js/views/table/TreeTable/CustomTreeTable.vue), [instance effect](http://laravue.cipherpols.com/#/table/tree-table)

The `slot` and `columns attributes` can exist at the same time. The data columns in the columns will be displayed on the left side of the slot custom column.

 ## Other
   If there are other requirements, please refer to the [el-table](http://element.eleme.io/#/en-US/component/table) api to modify the index.vue
