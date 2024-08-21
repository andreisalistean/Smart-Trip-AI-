import React, { useEffect, useMemo } from 'react';
import { TouchableOpacity, View, ViewStyle } from 'react-native';

import { Text } from 'components/Text';
import useFollowUser from 'hooks/useFollowUser';

import { styles } from './styles';

interface FollowButtonProps {
    currentUserId: string;
    followUserId: string;
    style?: ViewStyle;
}

const FollowButton: React.FC<FollowButtonProps> = ({
    currentUserId,
    followUserId,
    style,
}) => {
    const {
        isFollowing,
        followUser,
        unfollowUser,
        fetchFollowStatus,
        loading,
        error,
    } = useFollowUser(currentUserId, followUserId);

    useEffect(() => {
        fetchFollowStatus();
    }, [fetchFollowStatus]);

    const containerStyle = useMemo(() => [styles.container, style], [style]);
    const buttonTStyle = useMemo(() => [styles.buttonText, style], [style]);
    const buttonStyle = useMemo(() => [styles.button, style], [style]);
    const buttonStyleWithFollow = useMemo(
        () => [
            buttonStyle,
            isFollowing ? styles.unfollowButton : styles.followButton,
        ],
        [isFollowing, buttonStyle],
    );

    return (
        <View style={containerStyle}>
            {error && <Text style={styles.errorText}>{error}</Text>}
            {loading ? (
                <Text style={styles.loadingText}>Loading...</Text>
            ) : (
                <TouchableOpacity
                    style={buttonStyleWithFollow}
                    onPress={isFollowing ? unfollowUser : followUser}
                    disabled={loading}
                >
                    <Text style={buttonTStyle}>
                        {isFollowing ? 'Unfollow' : 'Follow'}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default FollowButton;
