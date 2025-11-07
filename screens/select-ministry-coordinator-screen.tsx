import { FontAwesome } from '@expo/vector-icons';
import { RouteProp, useRoute } from '@react-navigation/native';
import { HomeParamList } from 'navigation/tab-navigator';
import React, { useState } from 'react';
import { Alert, FlatList, TouchableOpacity } from 'react-native';
import { assignCoordinatorToMinistry } from 'services/assign-coordinator-to-ministry';
import { useAuthStore } from 'store/auth-store';
import { useMinistryStore } from 'store/ministries-store';
import { useUsersStore } from 'store/users-store';
import { Card, Separator, SizableText, Text, useTheme, XStack, YStack } from 'tamagui';
import { PrimaryButton } from 'tamagui.config';
import { UserProfile } from '../@types/user';

type SelectMinistryCoordinatorRouteProp = RouteProp<HomeParamList, 'SelectMinistryCoordinator'>;

const SelectMinistryCoordinatorScreen: React.FC = () => {
  const theme = useTheme();
  const { params } = useRoute<SelectMinistryCoordinatorRouteProp>();
  const ministryId = params.ministryId;
  const users = useUsersStore((state) => state.users);
  const fetchAllUsers = useUsersStore((state) => state.fetchAllUsers);
  const acceptMember = useMinistryStore((state) => state.acceptMember);
  const updateMinistry = useMinistryStore((state) => state.updateMinistry);
  const [selectedUserId, setSelectedUserId] = useState<UserProfile['uid'] | null>(null);
  const user = useAuthStore((state) => state.userData);

  React.useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleSelectUser = (userId: UserProfile['uid']) => {
    setSelectedUserId(userId);
  };

  const handleSave = async () => {
    if (!selectedUserId) {
      return;
    }

    if (user?.role !== 'admin') {
      Alert.alert('Error', 'Only admins can assign a coordinator.');
      return;
    }

    try {
      const response = await assignCoordinatorToMinistry(selectedUserId, ministryId);
      if (response.success) {
        acceptMember({ userId: selectedUserId, ministryId });
        updateMinistry({
          ministryId,
          newData: {
            coordinatorId: selectedUserId,
          },
        });
        Alert.alert('Coordinator successfully added!');
      } else {
        Alert.alert('Failed to add coordinator. Please try again.');
      }
    } catch (error) {
      console.error('Error adding coordinator:', error);
    }
  };

  const renderUserItem = ({ item }: { item: UserProfile }) => (
    <TouchableOpacity onPress={() => handleSelectUser(item.uid)}>
      <Card
        padding="$4"
        marginBottom="$3"
        elevate
        backgroundColor={item.uid === selectedUserId ? '$blueLight' : '$background'}>
        <XStack gap="$4" alignItems="center" justifyContent="space-between">
          <FontAwesome name="user-circle-o" size={36} color={theme.text.get()} />
          <YStack flex={1}>
            <SizableText fontFamily={'$body'} fontSize={'$6'}>
              {item.firstName} {item.lastName}
            </SizableText>
            {/* Convert to Icons */}
            {item.email ? (
              <SizableText fontFamily={'$body'} fontSize={'$5'}>
                {item.email}
              </SizableText>
            ) : null}
            {item.phoneNumber ? (
              <SizableText fontFamily={'$body'} fontSize={'$5'}>
                {item.phoneNumber}
              </SizableText>
            ) : null}
            {item.role ? (
              <SizableText fontFamily={'$body'} fontSize={'$5'}>
                {item.role}
              </SizableText>
            ) : null}
          </YStack>
        </XStack>
      </Card>
    </TouchableOpacity>
  );

  return (
    <YStack flex={1} padding="$4" backgroundColor="$background">
      <Text fontSize="$8" fontWeight="bold" marginBottom="$4">
        Seleccione un Coordinador para este ministerio.
      </Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.uid}
        renderItem={renderUserItem}
        ItemSeparatorComponent={() => <Separator />}
        showsVerticalScrollIndicator={false}
      />
      <PrimaryButton
        onPress={handleSave}
        mt={'$6'}
        mb={'$4'}
        backgroundColor={theme.primary.get() as string}
        size={'$5'}>
        Guardar
      </PrimaryButton>
    </YStack>
  );
};

export default SelectMinistryCoordinatorScreen;
