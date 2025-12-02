import numpy as np
from audiocomplib import AudioCompressor
import librosa
import numpy as np
from pydub import AudioSegment
import sys

#convert mp3 to ndarray
def mp3_to_ndarray(mp3_file_path):
    #sr = None preserves native sampline rate of mp3
    audio_array, sampling_rate = librosa.load(mp3_file_path, sr=None) 

    if audio_array.ndim == 1:
        audio_array = np.expand_dims(audio_array, axis=0)  # (1, samples)

    print(f"Audio loaded successfully. Shape of ndarray: {audio_array.shape}")
    print(f"Sampling rate: {sampling_rate} Hz")
    return audio_array, sampling_rate

#convert ndarrray to mp3
def ndarray_to_mp3(audio_data, sample_rate, output_filename):
    # Convert back to 1D if mono
    if audio_data.ndim == 2 and audio_data.shape[0] == 1:
        audio_data = audio_data[0]

    # Convert float [-1,1] to int16
    int_samples = (audio_data * 32767).astype(np.int16)
    audio_segment = AudioSegment(
        int_samples.tobytes(),
        frame_rate=sample_rate,
        sample_width=2, # For 16-bit audio
        channels=1 if audio_data.ndim == 1 else audio_data.shape[1]
    )
    audio_segment.export(output_filename, format="mp3", bitrate="320k") # You can adjust bitrate

#input mp3 file
def compress_mp3(input_signal, output_filename):
    #convert to ndarray
    audio_array, sampling_rate = mp3_to_ndarray(input_signal)

    # Initialize compressor
    compressor = AudioCompressor(
        threshold=-30.0,
        ratio=12.0,
        attack_time_ms=1.0,
        release_time_ms=100.0,
        knee_width=3.0,
        makeup_gain=6.0,
        variable_release=True
    )

    # Process signal
    compressed_signal = compressor.process(audio_array, sampling_rate)

    #convert to mp3
    ndarray_to_mp3(compressed_signal, sampling_rate, output_filename)


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python compressor.py <input_filename> <output_filename>")
    else:
        compress_mp3(sys.argv[1], sys.argv[2])

#helpful functions to know:

# Get gain reduction in dB
#gain_reduction_db = compressor.get_gain_reduction()

# Adjust parameters
#compressor.set_ratio(6.0)
#compressor.set_makeup_gain(8.0)