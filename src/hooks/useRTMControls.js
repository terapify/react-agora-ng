import {useCallback, useContext} from 'react';
import {useRTMClient} from "./useRTMClient";
import {AgoraContext} from "../context/AgoraContext";

export const useRTMControls = () => {

    const rtmClient = useRTMClient();
    const {rtmChannel} = useContext(AgoraContext);

    const toggleAttendeeAudio = useCallback(async (userId) => {
        try {
            return await rtmClient.sendMessageToPeer({
                text: 'mute-audio-toggle',
            }, userId);
        } catch (error) {
            console.log(error);
            return error;
        }

    }, [rtmClient]);

    const toggleAttendeeVideo = useCallback(async (userId) => {
        try {
            return await rtmClient.sendMessageToPeer({
                text: 'mute-video-toggle',
            }, userId);
        } catch (error) {
            return error;
        }
    }, [rtmClient]);

    const removeAttendee = useCallback(async (userId) => {
        try {
            return await rtmClient.sendMessageToPeer({
                text: 'remove-attendee',
            }, userId);
        } catch (error) {
            console.log(error);
            return error;
        }
    }, [rtmClient]);

    const stopAttendeeScreenShare = useCallback(async (userId) => {
        try {
            return await rtmClient.sendMessageToPeer({
                text: 'stop-screen-share',
            }, userId);
        } catch (error) {
            return error;
        }
    }, [rtmClient]);

    const leave = useCallback(async () => {
        await rtmChannel && rtmChannel.leave();
        await rtmClient && rtmClient.logout();
    }, [rtmChannel, rtmClient]);

    const sendChannelMessage = useCallback(async (text) => {
        try {
            await rtmChannel.sendMessage({text})
        } catch (error) {
            return error;
        }
    }, [rtmChannel]);

    const sendPeerMessage = useCallback(async (text, uid) => {
        try {
            return await rtmClient.sendMessageToPeer({
                text
            }, uid);
        } catch (error) {
            return error;
        }
    }, [rtmClient])

    return {
        toggleAttendeeVideo,
        toggleAttendeeAudio,
        stopAttendeeScreenShare,
        removeAttendee,
        sendChannelMessage,
        sendPeerMessage,
        leave
    }

}
