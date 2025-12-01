import numpy as np
from audiocomplib import AudioCompressor
import librosa
import numpy as np

# Generate sample signal (2 channels, 44100 samples)
input_signal = np.random.randn(2, 44100).astype(np.float32)

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
compressed_signal = compressor.process(input_signal, sample_rate=44100)

# Get gain reduction in dB
gain_reduction_db = compressor.get_gain_reduction()

# Adjust parameters
compressor.set_ratio(6.0)
compressor.set_makeup_gain(8.0)