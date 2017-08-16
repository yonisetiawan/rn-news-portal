import React from 'react'
import { View, Text, ListView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'

// Styles
import styles from './Styles/SourceGridStyles'

class SourceGrid extends React.Component {
  state: {
    fetching: boolean,
    source: any,
    dataSource: any
  }

  constructor (props) {
    super(props)
    const rowHasChanged = (r1, r2) => r1 !== r2
    // DataSource configured
    const ds = new ListView.DataSource({rowHasChanged})
    // Datasource is always in state
    this.state = {
      fetching: false,
      source: props.source,
      dataSource: props.source && props.source.data && Array.isArray(props.source.data) ? ds.cloneWithRows(props.source.data) : ds.cloneWithRows([])
    }
  }

  componentWillReceiveProps (newProps) {
    const { source } = newProps
    const { fetching } = source
    if (fetching !== this.state.fetching) {
      this.setState({
        fetching,
        source: source.data,
        dataSource: source.data && Array.isArray(source.data) ? this.state.dataSource.cloneWithRows(source.data) : this.state.dataSource.cloneWithRows([])
      })
    }
  }

  renderRow (rowData) {
    const sortAvailable = rowData.sortBysAvailable && Array.isArray(rowData.sortBysAvailable) && rowData.sortBysAvailable.length > 0 ? rowData.sortBysAvailable[0] : null
    return (
      <TouchableOpacity style={styles.row} onPress={() => Actions.articleScreen({sourceId: rowData.id, sortBy: sortAvailable, title: rowData.name})}>
        <Text style={styles.boldLabel}>{rowData.name}</Text>
      </TouchableOpacity>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <ListView
          contentContainerStyle={styles.listContent}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          enableEmptySections
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  source: state.source
})

export default connect(mapStateToProps)(SourceGrid)
