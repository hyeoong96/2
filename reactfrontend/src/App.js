import React from 'react';
import './App.css';
import api from './api';
import PostView from './Components/PostView'


import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      title: "",
      content: "",
      results: [],
    }
  }

  componentDidMount() {
      this.getPosts()
  }

  async getPosts() {
    const _results = await api.getAllPosts()
    console.log(_results)
    this.setState({results: _results.data})
  }

  handingChange = (event) => {
    this.setState({[event.target.name]:event.target.value})
  }

  handingSubmit = async (event) => {
    event.preventDefault() // event의 기본적인 기능을 하지 않게 함
    let result = await api.createPost(
      {
        title: this.state.title,
        content: this.state.content,
      })
    console.log("작성 완료!!!", result)
    this.setState({title:'',content:''})
    this.getPosts()
  }

  handingDelete = async (id) => {
    await api.deletePost(id)
    this.getPosts()
  }

  render() {
    return (
      <div className="App">
        <Container maxWidth="lg">
          <div className="PostingSection">
            <Paper className="PostingPaper">
              <h2>대나무 숲 글 작성하기</h2>
              <form className="PostingForm" onSubmit={this.handingSubmit}>
                <TextField
                  id="outlined-name"
                  label="글 제목"
                  name="title"
                  // className={classes.textField}
                  value={this.state.title}
                  onChange={this.handingChange}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-name"
                  label="본문"
                  multiline
                  rowsMax="10"
                  name="content"
                  // className={classes.textField}
                  value={this.state.content}
                  onChange={this.handingChange}
                  margin="normal"
                  variant="outlined"
                />
              <Button variant="outlined" color="primary" type="submit">제출하기</Button>
            </form>
          </Paper>
          </div>
          <div className="ViewSection">
            {
              this.state.results.map(
              (post) =>
              <Card className={'card'}>
                <CardContent>
                  <Typography className={'card-title'} color="textSecondary" gutterBottom>
                    대나무
                  </Typography>
                  <Typography variant="h5" component="h2">
                  <PostView
                    key={post.id}
                    title={post.title}
                    content={post.content}
                   />
                  </Typography>
                </CardContent>
                <CardActions>
                <Button onClick={(event)=>this.handingDelete(post.id)} color="secondary" size="small">삭제하기</Button>
                </CardActions>
              </Card>
              )
            }
          </div>
        </Container>
      </div>
    )
  }
}


export default App;
