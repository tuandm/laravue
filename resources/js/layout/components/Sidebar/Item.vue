<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
  },
  render(h, context) {
    const { icon, title } = context.props;
    const vnodes = [];

    if (icon && icon.startsWith('el-')) {
      vnodes.push(<i class={icon} />);
    } else {
      vnodes.push(<svg-icon icon-class={icon}/>);
    }

    if (title) {
      vnodes.push(<span slot='title'>{(title)}</span>);
    }
    return vnodes;
  },
};
</script>

<style lang="scss" scoped>
  .el-submenu [class^="el-icon-"] {
    text-align: left;
  }
</style>
