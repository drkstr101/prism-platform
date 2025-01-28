#!/usr/bin/env bash

# set -eu
# set -o pipefail

# Returns a random unused port
function random::port() {
  local port=$(shuf -i 50000-65000 -n 1)
  netstat -lat | grep "$port" >/dev/null
  if [[ $? == 1 ]]; then
    echo "$port"
  else
    echo random::port
  fi
}

function print::title() {
  local blue reset message
  blue="\033[0;34m"
  reset="\033[0;39m"
  message="${1}"

  echo -e "\n${blue}${message}${reset}" >&2
}

function print::info() {
  local message
  message="${1}"

  echo -e "${message}" >&2
}

function print::error() {
  local message red reset
  message="${1}"
  red="\033[0;31m"
  reset="\033[0;39m"

  echo -e "${red}${message}${reset}" >&2
  exit 1
}

function print::success() {
  local message green reset
  message="${1}"
  green="\033[0;32m"
  reset="\033[0;39m"

  echo -e "${green}${message}${reset}" >&2
  exitcode="${2:-0}"
  exit "${exitcode}"
}

function print::warn() {
  local message yellow reset
  message="${1}"
  yellow="\033[0;33m"
  reset="\033[0;39m"

  echo -e "${yellow}${message}${reset}" >&2
  exit 0
}

function tools::os() {
  case "$(uname)" in
  "Darwin")
    echo "darwin"
    ;;

  "Linux")
    echo "linux"
    ;;

  *)
    print::error "Unknown OS \"$(uname)\""
    ;;
  esac
}

function tools::arch() {
  case "$(uname -m)" in
  arm64 | aarch64)
    echo "arm64"
    ;;

  amd64 | x86_64)
    if [[ "${1:-}" == "--blank-amd64" ]]; then
      echo ""
    elif [[ "${1:-}" == "--uname-format-amd64" ]]; then
      echo "x86_64"
    else
      echo "amd64"
    fi
    ;;

  *)
    print::error "Unknown Architecture \"$(uname -m)\""
    ;;
  esac
}

function path::export() {
  local dir
  dir="${1}"

  if ! echo "${PATH}" | grep -q "${dir}"; then
    PATH="${dir}:$PATH"
    export PATH
  fi
}

function install::bit() {
  local dir="${HOME}/bin"

  # while [[ "${#}" != 0 ]]; do
  #   case "${1}" in
  #   --directory)
  #     dir="${2}"
  #     shift 2
  #     ;;
  #   *)
  #     print::error "unknown argument \"${1}\""
  #     ;;
  #   esac
  # done

  mkdir -p "${dir}"
  path::export "${dir}"

  if [[ ! -f "${dir}/bit" ]]; then
    npx --yes @teambit/bvm install --use-system-node
    # ln -s "${HOME}/bin/bit" "${dir}/bit"
  fi

  print::info "Using $("${dir}"/bit version)"
}

# function install::crane() {
#   local dir token
#   token=""

#   while [[ "${#}" != 0 ]]; do
#     case "${1}" in
#     --directory)
#       dir="${2}"
#       shift 2
#       ;;

#     --token)
#       token="${2}"
#       shift 2
#       ;;

#     *)
#       print::error "unknown argument \"${1}\""
#       ;;
#     esac
#   done

#   mkdir -p "${dir}"
#   path::export "${dir}"

#   if [[ ! -f "${dir}/crane" ]]; then
#     local version curl_args os arch

#     version="$(jq -r .crane "$(dirname "${BASH_SOURCE[0]}")/tools.json")"

#     curl_args=(
#       "--fail"
#       "--silent"
#       "--location"
#     )

#     if [[ "${token}" != "" ]]; then
#       curl_args+=("--header" "Authorization: Token ${token}")
#     fi

#     print::title "Installing crane ${version}"

#     os=$(tools::os)
#     arch=$(tools::arch --uname-format-amd64)

#     curl "https://github.com/google/go-containerregistry/releases/download/${version}/go-containerregistry_Linux_${arch}.tar.gz" \
#       "${curl_args[@]}" | tar -C "${dir}" -xz crane

#     chmod +x "${dir}/crane"
#   else
#     print::info "Using crane $("${dir}"/crane version)"
#   fi
# }
