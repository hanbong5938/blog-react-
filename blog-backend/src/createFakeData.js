import Post from './models/post';

export default function createFakeData() {
    const posts = [...Array(40).keys()].map(i => ({
        title: `포스트 #${i}`,
        body:'가짜 데이터 내용가짜 데이터 내용가짜 데이터 내용가짜 데이터 내용가짜 데이터 내용가짜 데이터 내용가짜 데이터 내용가짜 데이터 내용가짜 데이터 내용가짜 데이터 내용가짜 데이터 내용가짜 데이터 내용가짜 데이터 내용',
        tags:['이건', '가짜', '데이터']
    }));
    Post.insertMany(posts, (err, docs) =>{
        console.log(docs);
    });
}