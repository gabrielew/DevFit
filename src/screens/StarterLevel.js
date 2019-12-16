import React from 'react';
import styled from 'styled-components/native';
import {connect} from 'react-redux';
import DefaultButton from '../components/DefaultButton';

const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  background-color: #fff;
  margin-left: 30px;
  margin-right: 30px;
  margin-top: 50px;
`;

const HeaderText = styled.Text`
  font-size: 15px;
  color: #7159c1;
  text-align: center;
  margin-bottom: 30px;
`;

const BoldText = styled.Text`
  font-weight: bold;
`;

const LevelArea = styled.View`
  width: 100%;
`;

const Text = styled.Text`
  color: ${props => props.color || '#000'};
`;

const NextButton = styled.Button``;

const Page = props => {
  const levels = ['beginner', 'intermidiate', 'advanced'];

  let funnyPhrase = '';
  switch (props.workoutDays.length) {
    case 1:
      funnyPhrase = 'Just one day? it will take five years to get some result';
      break;
    case 2:
      funnyPhrase = 'Just two day? it will take four years to get some result';
      break;
    case 3:
      funnyPhrase = 'Just tree day? it will take tree years to get some result';
      break;
    case 4:
      funnyPhrase = 'Just four day? it will take two years to get some result';
      break;
    case 5:
      funnyPhrase = 'Just five day? it will take one year to get some result';
      break;
    case 6:
      funnyPhrase = 'Just six day? it will take six months to get some result';
      break;
    case 7:
      funnyPhrase = 'Wow!!';
      break;
  }

  const handleLevel = level => {
    props.setLevel(level);
    props.navigation.setParams({level});
  };

  return (
    <Container>
      <HeaderText>{funnyPhrase}</HeaderText>
      <HeaderText>
        <BoldText>What ur level today?</BoldText>
      </HeaderText>
      <LevelArea>
        {levels.map((item, key) => (
          <DefaultButton
            key={key}
            bgColor={props.level == item ? '#7159c1' : false}
            onPress={() => handleLevel(item)}
            style={{marginBottom: 20}}>
            <Text color={props.level == item ? '#FFF' : false}>{item}</Text>
          </DefaultButton>
        ))}
      </LevelArea>
    </Container>
  );
};

Page.navigationOptions = ({navigation}) => {
  const handleNextAction = () => {
    if (!navigation.state.params || !navigation.state.params.level) {
      alert('check at least one item');
      return;
    }

    navigation.navigate('StarterRecommendations');
  };
  return {
    title: '',
    headerRight: <NextButton title="Next" onPress={handleNextAction} />,
    headerRightContainerStyle: {
      marginRight: 10,
    },
  };
};

const mapStateToProps = state => {
  return {
    level: state.userReducer.level,
    workoutDays: state.userReducer.workoutDays,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLevel: level => dispatch({type: 'SET_LEVEL', payload: {level}}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
