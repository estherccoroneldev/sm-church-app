import React from 'react';
import { Dimensions } from 'react-native';
import { H3, Image, SizableText, YStack } from 'tamagui';
import { Container } from '../components/Container';
import StaticInfo from '../components/StaticInfo';

const CURRENT_DETAIL = {
  id: 'about-us',
  imageUrl:
    'https://www.iglesiasanmateo.org/uploads/5/6/5/4/56543779/background-images/936258497.jpg',
  title: '¡La historia de San Mateo ha sido increíble!',
  name: 'Acerca de Nosotros',
  description: `Nuestra Iglesia es una comunidad muy activa que desea ofrecer a sus miembros un adecuado ambiente para la salud espiritual, emocional y física.\n\nLa palabra “episcopal” se refiere a un gobierno dirigido por obispos. El episcopado histórico continúa el trabajo de los primeros apóstoles en la iglesia, guardando la fe, unidad y disciplina de la iglesia, y la ordenación de los hombres y mujeres a continuar el ministerio de Cristo. Un episcopal es una persona que pertenece a la Iglesia  Episcopal, que incluye las iglesias de Estados Unidos y otros 14 países. \n\nLa Iglesia Episcopal es parte de la Comunión Anglicana mundial. \n\n\nComo episcopales, creemos: \n\nLas Sagradas Escrituras son las palabras reveladas de Dios, que inspiró a los autores humanos de las Escrituras, y que está interpretada por la Iglesia bajo la guía del Espíritu Santo.\n\nEl Credo Niceno es la declaración básica de nuestra creencia acerca de Dios. Fue adoptado en los años 300 por los fundadores de la iglesia primitiva y se dice todos los domingos en la Episcopal y las iglesias anglicanas de todo Estados Unidos y el mundo.\n\nLos dos grandes sacramentos del Evangelio, dado por Cristo a la Iglesia, son el Bautismo y la Eucaristía. En el Bautismo renunciamos a Satanás, nos arrepentimos de nuestros pecados, y adoptamos a Jesús como nuestro Señor y Salvador. En la Sagrada Eucaristía, el centro de nuestra vida de adoración, nos acordamos y participamos en la vida, muerte y resurrección de Jesucristo y anticipamos su segundo regreso.\n\nLas enseñanzas y creencias de la Iglesia Episcopal se articulan en una "Guía de fe" en nuestro Libro de Oración Común.
  `,
} as const;

const { height } = Dimensions.get('window');
const DEFAULT_IMAGE = require('../assets/church-placeholder.png');

const AboutUsScreen: React.FC = () => {
  return (
    <Container>
      <Image
        source={CURRENT_DETAIL.imageUrl ? { uri: CURRENT_DETAIL.imageUrl } : DEFAULT_IMAGE}
        width="100%"
        height={height * 0.35}
        borderRadius="$6"
        marginBottom="$2"
        alt={CURRENT_DETAIL.title}
        aria-label={CURRENT_DETAIL.title}
      />
      <YStack marginVertical="$4">
        <H3>{CURRENT_DETAIL.title}</H3>
      </YStack>

      <SizableText fontFamily={'$body'} fontSize="$7">
        {CURRENT_DETAIL.description}
      </SizableText>
      <StaticInfo />
    </Container>
  );
};

export default AboutUsScreen;
