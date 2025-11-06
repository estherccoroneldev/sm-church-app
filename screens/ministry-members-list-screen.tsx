import { FontAwesome } from '@expo/vector-icons';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Container } from 'components/Container';
import { db, firestore } from 'config/firebase';
import { useGetMinistry } from 'hooks/use-get-ministry';
import React from 'react';
import { Alert } from 'react-native';
import { useAuth } from 'store/auth-store';
import { useMinistryStore } from 'store/ministries-store';
import { Button, H4, SizableText, Spinner, useTheme, XStack, YStack } from 'tamagui';
import { UserProfile } from '../@types/user';
import { HomeParamList } from '../navigation/tab-navigator';

type MinistryMembersListRouteProp = RouteProp<HomeParamList, 'MinistryMembersList'>;

const MinistryMembersListScreen: React.FC = () => {
  const theme = useTheme();
  const { params } = useRoute<MinistryMembersListRouteProp>();
  const user = useAuth((state) => state.user);
  const acceptMember = useMinistryStore((state) => state.acceptMember);
  const ministryId = params.id;
  const { ministry, isLoading } = useGetMinistry(ministryId);

  React.useEffect(() => {
    console.info('Ministry updated members');
  }, [ministry?.acceptedMembers, ministry?.pendingMembers]);

  const handleConfirmMember = async (member: UserProfile) => {
    if (user?.id !== ministry?.coordinatorId) {
      Alert.alert('Error', 'Only the coordinator can confirm members.');
      return;
    }
    try {
      await db
        .collection('ministries')
        .doc(ministryId)
        .update({
          acceptedMembers: firestore.FieldValue.arrayUnion(member),
          pendingMembers: firestore.FieldValue.arrayRemove(member),
        });
      acceptMember({ userId: member.uid, ministryId });

      Alert.alert('Miembro confirmado exitosamente", La lista ha sido actualizada.');
    } catch (error) {
      console.error('Error confirming member:', error);
    }
  };

  const handleRejectMember = async (member: UserProfile) => {
    if (user?.id !== ministry?.coordinatorId) {
      Alert.alert('Error', 'Only the coordinator can confirm members.');
      return;
    }
    try {
      await db
        .collection('ministries')
        .doc(ministryId)
        .update({
          pendingMembers: firestore.FieldValue.arrayRemove(member),
        });

      Alert.alert('Miembro ignorado exitosamente", La lista ha sido actualizada.');
    } catch (error) {
      console.error('Error rejecting member:', error);
    }
  };

  if (isLoading) {
    return (
      <Container>
        <Spinner size="large" color={theme.primary.get()} style={{ alignSelf: 'center' }} />
      </Container>
    );
  }

  return (
    <Container>
      {ministry?.pendingMembers && user?.id === ministry.coordinatorId && (
        <>
          <H4 marginBottom="$4">Solicitudes Pendientes</H4>
          <YStack py="$3" marginBottom="$5">
            {ministry?.pendingMembers?.length === 0 ? (
              <SizableText size={'$5'}>No se encontraron solicitudes pendientes.</SizableText>
            ) : (
              ministry?.pendingMembers?.map((member) => (
                <PendingListItem
                  member={member}
                  onConfirmPress={() => handleConfirmMember(member)}
                  onRejectPress={() => handleRejectMember(member)}
                />
              ))
            )}
          </YStack>
        </>
      )}

      <H4 marginBottom="$4">Miembros</H4>
      <YStack py="$3">
        {ministry?.acceptedMembers?.length === 0 ? (
          <SizableText>No se encontraron miembros para este ministerio.</SizableText>
        ) : (
          ministry?.acceptedMembers?.map((member) => (
            <XStack key={member.uid} gap="$4" alignItems="center" justifyContent="space-between">
              <FontAwesome name="user-circle-o" size={36} color={theme.text.get()} />
              <YStack flex={1}>
                <SizableText fontFamily={'$body'} fontSize={'$6'}>
                  {member.firstName} {member.lastName}
                </SizableText>
                {member.uid === ministry.coordinatorId ? (
                  <SizableText fontFamily={'$body'} fontSize={'$5'} color={theme.primary.get()}>
                    Coordinador
                  </SizableText>
                ) : null}
                {member.email ? (
                  <SizableText fontFamily={'$body'} fontSize={'$5'}>
                    {member.email}
                  </SizableText>
                ) : null}
                {member.phoneNumber ? (
                  <SizableText fontFamily={'$body'} fontSize={'$5'}>
                    {member.phoneNumber}
                  </SizableText>
                ) : null}
              </YStack>
            </XStack>
          ))
        )}
      </YStack>
    </Container>
  );
};

export default MinistryMembersListScreen;

function PendingListItem({
  member,
  onConfirmPress,
  onRejectPress,
}: {
  member: UserProfile;
  onConfirmPress: () => void;
  onRejectPress: () => void;
}): React.JSX.Element {
  const theme = useTheme();
  return (
    <YStack
      key={member.uid}
      gap={'$2'}
      py="$2"
      borderBottomWidth={1}
      borderColor={theme.borderColor}>
      <XStack gap="$4" alignItems="center" justifyContent="space-between">
        <FontAwesome name="user-circle-o" size={36} color={theme.text.get()} />
        <YStack flex={1}>
          <SizableText fontFamily={'$body'} fontSize={'$6'}>
            {member.firstName} {member.lastName}
          </SizableText>
          {/* Convert to Icons */}
          {member.email ? (
            <SizableText fontFamily={'$body'} fontSize={'$5'}>
              {member.email}
            </SizableText>
          ) : null}
          {member.phoneNumber ? (
            <SizableText fontFamily={'$body'} fontSize={'$5'}>
              {member.phoneNumber}
            </SizableText>
          ) : null}
        </YStack>
      </XStack>
      <XStack gap="$4" my="$2" justifyContent="flex-end">
        <Button
          onPress={onRejectPress}
          size="$3"
          variant="outlined"
          fontFamily={'$body'}
          fontSize={'$4'}>
          Rechazar
        </Button>
        <Button
          fontFamily={'$body'}
          fontSize={'$4'}
          onPress={onConfirmPress}
          size="$3"
          backgroundColor={theme.primary.get()}
          variant="outlined">
          Confirmar
        </Button>
      </XStack>
    </YStack>
  );
}
