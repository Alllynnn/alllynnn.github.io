var posts=["2024/01/14/github-actions-deploy/","2024/12/21/hello-world/","2024/01/07/my-first-post/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };