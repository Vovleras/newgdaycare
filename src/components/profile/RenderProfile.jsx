//import libraries
import React from 'react';
import RenderContent from './RenderContent';
import {useLocation} from 'react-router-dom';


//import components
const RenderProfile = ({
    sedePerteneciente,
    img_profile,
    nombreUsuario,
    cursosAsignados,
}) => {

    const location = useLocation();
    const [data, setData] = React.useState({
        sedePerteneciente: '',
        img_profile:  '',
        nombreUsuario: '',
        cursosAsignados: '',
        aprovadeUser: ['No Have Pickavd']
        
    });
    let img_Course = '';
    const imgIndex = {
        '1': 'Jellyfish',
        '2': 'Dandy',
        '3': 'Lobster',
        '4': 'Safari',
        '5': 'Jungle',
        '6': 'Forest',
        '7': 'After',  
    }
    for (let element in imgIndex) {
            
        if (!data.cursosAsignados.includes(imgIndex[element])) continue;
        
        img_Course = element
      }

    React.useEffect(() => {
        setData({
            sedePerteneciente: sedePerteneciente,
            img_profile:  img_profile,
            nombreUsuario: (nombreUsuario).toLowerCase(),
            cursosAsignados: cursosAsignados,
        });
       

    },
    [ sedePerteneciente, 
      img_profile, 
      nombreUsuario, 
      cursosAsignados
    ]);
    
    React.useEffect(() => {
        
        const data = window.sessionStorage.getItem('data_stundent');

        if (window.sessionStorage.hasOwnProperty('data_stundent')) {
            let data_ = JSON.parse(data);
            let pickavd  = ['No Have Pickavd']
            // Extract Information pickavd
            if ((data_.data)?.all_pickup) {
                pickavd = (data_.data)?.all_pickup?.split(',');
                
                if (pickavd.join('').replace(/\s/g, '') === '')  {
                   pickavd = ['No Have Pickavd']
                }
            }
            setData({
                sedePerteneciente: (data_.sede).slice(0, 3),
                img_profile:  data_.img,
                nombreUsuario: data_.name,
                cursosAsignados: (data_.sede).slice(4, data_.sede.length),
                aprovadeUser: pickavd,
            });
        }

        //scroll to top
        window.scrollTo(0, 0);

    }, [location]);

    //render
    return (
        <>
           <main className='_container_info_personal'>
                <section className='_container_profile_data_'>
                    <div className='_profile_data_'>
                        <img  className="profile" src={data.img_profile} alt="profile" />
                        <div>
                            <h1>{data.nombreUsuario}</h1>
                            {data.aprovadeUser && (data.aprovadeUser)?.map((item, index) => {
                                if (item !== ' ' && item !== '') {
                                    return (<h1 key={index}>Pickup {index + 1}: {item}</h1>)
                                }
                             })
                            }
                        </div>  
                    </div>
                        <div className='_profile_course'>
                            <div className='_profile_course_content'>
                                <img src={`/assets/course/${img_Course}.png`} />  
                            </div> 
                            <h1>{data.sedePerteneciente +" -"+ data.cursosAsignados}</h1> 
                        </div>
                </section>
           </main>
           <main className='_container_profile_'>
                <RenderContent />
           </main>
        </>
    )

};


export default RenderProfile;