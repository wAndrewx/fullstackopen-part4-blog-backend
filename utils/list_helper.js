const totalLikes = (blogs) => {
  return blogs
    .map((i) => {
      return i.likes;
    })
    .reduce((a, b) => {
      return a + b;
    });
};

const favoriteBlog = (blogs) => {
  const faveBlog = blogs
    .map((i) => {
      return i.likes;
    })
    .reduce((a, b) => {
      return Math.max(a, b);
    }, 0);

  const filterBlog = blogs.filter((i) => {
    return i.likes === faveBlog;
  });

  return {
    likes: faveBlog,
    author: filterBlog[0].author,
    title: filterBlog[0].title,
  };
};

const mostBlogs = (blogs) => {
  let authors = blogs.map((blog) => blog.author);
  authors = [...new Set(authors)];

  let published = new Array(authors.length).fill(0);
  blogs.map((blog) => (published[authors.indexOf(blog.author)] += 1));

  let index = published.indexOf(Math.max(...published));

  return {
    author: authors[index],
    blogs: published[index],
  };
};

const mostLikes = (blogs) => {
  let authors = blogs.map((blog) => blog.author);
  authors = [...new Set(authors)];

  let total = new Array(authors.length).fill(0);
  blogs.map((blog) => (total[authors.indexOf(blog.author)] += blog.likes));

  let index = total.indexOf(Math.max(...total));

  return {
    author: authors[index],
    likes: total[index],
  };
};

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
