from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Optional as _Optional

DESCRIPTOR: _descriptor.FileDescriptor

class WordRequest(_message.Message):
    __slots__ = ("word",)
    WORD_FIELD_NUMBER: _ClassVar[int]
    word: str
    def __init__(self, word: _Optional[str] = ...) -> None: ...

class WordResponse(_message.Message):
    __slots__ = ("word", "sum")
    WORD_FIELD_NUMBER: _ClassVar[int]
    SUM_FIELD_NUMBER: _ClassVar[int]
    word: str
    sum: int
    def __init__(self, word: _Optional[str] = ..., sum: _Optional[int] = ...) -> None: ...

class Empty(_message.Message):
    __slots__ = ()
    def __init__(self) -> None: ...
