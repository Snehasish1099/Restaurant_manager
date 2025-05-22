import React from 'react';
import Aboutus from '../images/Aboutus.jpg';

const Aboutus = () => {
    return (
        <div>
            <img src={Aboutus} alt="Aboutus" />

            <div>
                <h1>Why Choose Us?</h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipiscing elit, Etiam ornare tempus aliquet Pellentesque finibus. est et iaculis suscipitdolor nulla commodo dui nec ultricies arcu nisl tristique eros Morbi eros est pulvinar eget ornare ac ultrices eget risus.
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipiscing elit, Etiam ornare tempus aliquet Pellentesque finibus. est et iaculis suscipitdolor nulla commodo dui nec ultricies.
                </p>
                <div>
                    <Button title="Learn More" />
                </div>
            </div>
        </div>
    )
}

export default Aboutus;