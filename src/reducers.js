import Immutable from 'immutable'
import * as types from './actiontypes'
import * as actions from './actions'
import {load} from './persist'

const initialState = Immutable.Map({
  query: undefined,
  searchedQuery: undefined,
  offset: undefined,
  results: Immutable.fromJS([]),
  error: false,
  searching: false,
  fake: load('fake') == 'true',
  showingQueryBox: false,
  imageLoadedTime: 0,
  overflow: false,
  hoveredImageBoundingBox: null,
});

export default function reduce(state=initialState, action) {
  switch (action.type) {
    case types.SET_QUERY:
      return state.merge({query: action.query})

    case types.SET_SEARCHED_QUERY:
      return state.merge({searchedQuery: action.searchedQuery})

    case types.SET_OFFSET:
      return state.merge({offset: action.offset})

    case types.FETCH_GIFS_REQUEST:
      return state.merge({searching: true})

    case types.FETCH_GIFS_SUCCESS:
      return state.merge({searching: false, results: action.results,
        query: action.query, offset: action.offset})

    case types.FETCH_GIFS_FAILURE:
      return state.merge({searching: false, error: action.error || true})

    case types.FAKE_CHANGE:
      return state.merge({fake: action.fake})

    case types.SHOW_QUERY_BOX:
      return state.merge({showingQueryBox: true})

    case types.HIDE_QUERY_BOX:
      return state.merge({showingQueryBox: false, query: action.searchedQuery})

    case types.SET_HOVERED_RESULT:
      return state.merge({hoveredResultId: action.hoveredResultId})
      
    case types.IMAGE_LOADED_TIME:
      return state.merge({imageLoadedTime: action.imageLoadedTime})
      
    case types.OVERFLOW:
      return state.merge({overflow: true})

    case types.CLEAR_OVERFLOW:
      return state.merge({overflow: false})

    case types.SET_HOVERED_IMAGE_BOUNDING_BOX:
      return state.merge({hoveredImageBoundingBox: action.hoveredImageBoundingBox})

    default:
      return state
  }
}
