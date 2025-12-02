import numpy as np
from audiocomplib import AudioCompressor
import librosa
import numpy as np
from pydub import AudioSegment

#convert mp3 to ndarray
def mp3_to_ndarray(mp3_file_path):
    #sr = None preserves native sampline rate of mp3
    audio_array, sampling_rate = librosa.load(mp3_file_path, sr=None) 

    print(f"Audio loaded successfully. Shape of ndarray: {y.shape}")
    print(f"Sampling rate: {sampling_rate} Hz")
    return audio_array, sampling_rate

#convert ndarrray to mp3
def ndarray_to_mp3(audio_data, sample_rate, output_filename):
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
        threshold=-10.0,
        ratio=4.0,
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


#helpful functions to know:

# Get gain reduction in dB
#gain_reduction_db = compressor.get_gain_reduction()

# Adjust parameters
#compressor.set_ratio(6.0)
#compressor.set_makeup_gain(8.0)