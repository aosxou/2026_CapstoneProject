#status값 설정
DOCUMENT_STATUS = {
	"UPLOADED": "UPLOADED",
	"OCR_RUNNING": "OCR_RUNNING",
	"AI_RUNNING": "AI_RUNNING",
	"ACTION_RUNNING": "ACTION_RUNNING",
	"DONE": "DONE",
	"FAILED": "FAILED"
} #문서 상태 OCR -> AI -> Action -> 완료 흐름

CALENDAR_STATUS = {
	"CREATED": "CREATED",
	"FAILED": "FAILED"
} #일정 생성 상태

URGENCY_LEVEL = {
	"HIGH": "high",
	"NORMAL": "normal",
	"LOW": "low"
} #urgency 수준