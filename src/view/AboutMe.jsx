import my_photo from './img/my_photo.jpg';

const AboutMe = () => {
    return (
        <main>
            <img class="center__photo spacing__large" src={my_photo} alt="Randy Brown" width="250" height="250" />
            <p>Hello, my name is Randy</p>
        </main>
    );
}
 
export default AboutMe;